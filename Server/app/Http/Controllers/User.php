<?php

namespace App\Http\Controllers;

use App\Enums\UserRoles;
use App\Http\Resources\User as ResourcesUser;
use App\Models\User as ModelsUser;
use App\Models\Role as ModelsRole;
use Illuminate\Http\Request;

class User extends Controller
{
    public function index()
    {
        return ModelsUser::orderBy('id', 'asc')->get()->toResourceCollection();
    }

    public function show(ModelsUser $user)
    {
        return new ResourcesUser($user);
    }

    public function store(Request $request)
    {
        if ($request->user()->cannot('create', auth()->user())) {
            return response()->json([
                'message' => 'Vous devez disposer des droits suffisants pour effectuer cette action.',
            ], 403);
        }

        $user = ModelsUser::create([
            "name" => $request->name,
            "first_name" => $request->first_name,
            "company_position" => $request->company_position,
            "email" => $request->email,
            'password' => $request->password,
            "created_at" => now(),
        ]);

        $roleId = intval($request->role);
        $user->roles()->attach([$roleId]);
    }

    public function update(Request $request, ModelsUser $user)
    {
        if ($request->user()->cannot('update', $user)) {
            return response()->json([
                'message' => 'Vous devez disposer des droits suffisants pour effectuer cette action.',
            ], 403);
        }

        $user->updateOrFail([
            "name" => $request->name,
            "first_name" => $request->first_name,
            "company_position" => $request->company_position,
            "email" => $request->email,
            'password' => $request->password,
            "updated_at" => now()
        ]);

        $roleId = intval($request->role);
        $role = ModelsRole::find($roleId);
        $currentRoles = $request->user()->roles->pluck('name');
        $isAdmin = $currentRoles->contains(UserRoles::ADMIN->name);
        $isModerator = $currentRoles->contains(UserRoles::MODERATOR->name);

        if ($user->id == $request->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas modifier votre propre rôle.',
            ], 403);
        }

        if (!$isAdmin && !$isModerator) {
            return response()->json([
                'message' => 'Vous devez disposer des droits suffisants.',
            ], 403);
        }

        if ($isModerator && !$isAdmin) {
            if ($role->name === UserRoles::ADMIN->name) {
                return response()->json([
                    'message' => 'Un modérateur ne peut pas attribuer le rôle ADMIN.',
                ], 403);
            }
        }

        $user->roles()->sync([$roleId]);

        return response()->json([
            "message" => "Utilisateur mis à jour",
            "data" => $user
        ], 200);
    }

    public function destroy(Request $request, ModelsUser $user)
    {
        if ($request->user()->cannot('delete', $user)) {
            return response()->json([
                'message' => 'Vous devez disposer des droits suffisants pour effectuer cette action.',
            ], 403);
        }

        $user->delete();

        return response()->noContent();
    }
}
