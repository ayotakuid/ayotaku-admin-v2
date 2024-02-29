<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimeController extends Controller
{
    public function indexAnime() {
        $data = [
            'active' => 'activeAnime'
        ];
        return view('anime.index', $data);
    }
}
