<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\User as ControllersUser;
use App\Http\Resources\User;
use App\Models\User as ModelsUser;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource("users", ControllersUser::class);
});
