<?php
namespace app\index\controller;

class Index
{
    public function index()
    {
        return $this->redirect('/public/index.php/user/index/login');
    }

}
