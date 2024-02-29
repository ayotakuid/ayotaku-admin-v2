<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function indexPage() {
        $data = [
            'active' => 'activeDashboard'
        ];
        return view('admin.index', $data);
    }
}
