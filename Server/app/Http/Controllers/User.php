<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as ResourcesUser;
use App\Models\User as ModelsUser;
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
                'message' => 'Vous devez disposer des droits suffisants pour effectuer cette action.',
            ], 403);
        }

        $user->delete();

        return response()->noContent();
    }
}
