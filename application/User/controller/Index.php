<?php
namespace app\User\controller;
use think\Controller;
use think\facade\Session;

class Index extends Controller
{
    /**渲染用户页面*/
    public function index()
    {
/*        $session=Session::get('user_id');
        if (!$session){
            $this->redirect('/User/login');
        }*/
        return $this->fetch();
    }
    /**登录相关*/
    public function login()//渲染登录界面
    {
        return $this->fetch('login');
    }
    public function loginCheck()//登录检查
    {
        $data=[
            'email'     => $_POST['email'],
            'password'  => $_POST['password']
        ];

        foreach ($data as $v) {
            if (!trim($v) || !trim($v))
                return show(0, '您还没有填完哟','');
        }
        $model=model('User')->login($data);
        if($model){
            Session::set('user_id',$model['user_id']);
            return show(1,'登陆成功','');
        }else{
            return show(0,'用户名或密码不正确','');
        }
    }
    /**注册相关*/
    public function sign()
    {
        return $this->fetch('sign');
    }
    public function signCheck()
    {
        $data=[
            'email'     =>  $_POST['email'],
            'password'  =>  $_POST['password'],
            'captcha'   =>  $_POST['validate']
        ];
        if(!captcha_check($data['captcha'])){
            return show(0,'验证码不正确','');
        };
        foreach ($data as $v) {
            if (!trim($v) || !trim($v))
                return show(0, '您还没有填完哟','');
        }
        $model=model('User')->register($data);
        if ($model){
            return show(1,'注册成功','');
        }else{
            return show(0,'注册失败','');
        }
    }
}
