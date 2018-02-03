<?php
namespace app\User\model;
use think\Db;
use think\Model;

class User extends Model
{
    /**登录模块*/
    public function login($data)
    {
        $db=Db::table('jszp_user')->where('email',$data['email'])->find();
        if(!$db){
            return false;
        }
        $salt=$db['salt'];
        $psw=sha1($data['password'].$salt);
        if($psw===$db['password']){
            return $db;
        }
        return null;
    }
    /**注册模块*/
    public function register($data)
    {
        //密码加密
        $saltLen=rand(6,10);
        $saltNum=rand(0,15);
        $saltDic='1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPOASDFGHJKLZXCVBNM+-=./';
        $saltChar=str_shuffle($saltDic);
        $salt=substr($saltChar,$saltNum,$saltLen);
        //加盐
        $psw=sha1($data['password'].$salt);
        $dbData=[
            'email'     =>  $data['email'],
            'password'  =>  $psw,
            'salt'      =>  $salt
        ];
        $db=Db::table('jszp_user')->insert($dbData);
        if(!$db){
            return false;
        }
        return true;
    }
    public function findUser($email='')
    {
        $db=Db::table('user')->where('email',$email)->find();
        return $db;
    }


}