<?php

namespace App\Http\Controllers;

use App\Enums\UserRoles;
use App\Http\Resources\User as ResourcesUser;
use App\Models\User as ModelsUser;
use App\Policies\UserPolicy;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;

class User extends Controller
{
    public function index()
    {
        return ModelsUser::all()->toResourceCollection();
    }

    public function show(ModelsUser $user)
    {
        return new ResourcesUser($user);
    }

    public function store(Request $request) {}

    public function update(Request $request, User $user) {}

    public function destroy(Request $request, ModelsUser $user)
    {
        if ($request->user()->cannot('delete', $user)) {
            return response()->json([
                'message' => 'Vous devez disposer des droit suffisant pour effectuer cette action',
            ], 403);
        }

        $user->delete();

        return response()->noContent();
    }
}
