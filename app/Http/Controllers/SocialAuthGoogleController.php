<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;



class SocialAuthGoogleController extends Controller
{
	public function __construct()
	{
		parent::__construct(FALSE);
	}

	public function redirect()
	{
		return Socialite::driver('google')->redirect();
	}

	public function callback()
	{
		try {

			$googleUser = Socialite::driver('google')->user();

			$domain = explode('@', $googleUser->email)[1];

			if (!in_array($domain, ["topica.edu.vn", "topica.asia"])){
				return redirect()->to('/');
			}

			$existUser = User::where('email', $googleUser->email)->first();

			if($existUser != null && $existUser->role == 'Admin') {
				Auth::loginUsingId($existUser->id);
			}
			else if($existUser->role == null){
				$user = new User;
				$user->name = $googleUser->name;
				$user->email = $googleUser->email;
				$user->google_id = $googleUser->id;
				$user->role = 'User';
				$user->save();
				Auth::loginUsingId($user->id);
			}

			return redirect()->to('/');
		}
		catch (Exception $e) {
			return $e;
		}
	}

	public function logout()
	{
		Auth::logout();

		return redirect('/');
	}

	public function login()
	{
		if (Auth::check() == true) {
			return redirect('/');
		}
		return view("login");
	}
}