<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class IndexController extends Controller
{
    public function indexPage() {
        $data = [
            'active' => 'activeDashboard'
        ];
        return view('admin.index', $data);
    }

    public function signoutHandler() {
        $sessionLogin = Session::get('stateLogin');

        
    }
}
