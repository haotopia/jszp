<?php
namespace app\Admin\controller;
use think\Controller;
use think\Db;
use think\facade\Env;
use think\facade\Session;

/**
 * Created by PhpStorm.
 * User: lflx1
 * Date: 2018/2/2
 * Time: 23:43
 */
class Index extends Controller
{
    public function index()
    {
        return $this->fetch();
    }
    public function admin()
    {
        $session=Session::get('admin');
        if(!$session){
            return $this->redirect('/public/index.php/admin');
        }
        $list=model('Admin')->fetchAdmin();
        $this->assign('list', $list);
        $page = $list->render();
        $count=$list->total();
        $this->assign('page', $page);
        $this->assign('count', $count);
        return $this->fetch('admin-table');

    }
    public function loginCheck()//登录检查
    {
        $data=[
            'admin'     => $_POST['username'],
            'password'  => $_POST['password']
        ];

        foreach ($data as $v) {
            if (!trim($v) || !trim($v))
                return show(0, '您还没有填完哟','');
        }
        $model=model('Admin')->login($data);
        if($model){
            Session::set('admin',$model['admin']);
            return $this->redirect('/public/index.php/admin/index/admin');
        }else{
            return show(0,'用户名或密码不正确','');
        }
    }
    public function search(){
        $session=Session::get('admin');
        if(!$session){
            return $this->redirect('/public/index.php/admin');
        }
        $search=$_POST['content'];
        $list=model('Admin')->fetchAdminSearch($search);
        $this->assign('list', $list);
        $page = $list->render();
        $count=$list->total();
        $this->assign('page', $page);
        $this->assign('count', $count);
        return $this->fetch('admin-table');
    }
    public function outputAll(){
        $output=model('Admin')->zipDir(Env::get('root_path').'pdfs',"outputAll.zip");
        if(!$output)
            $this->redirect('/public/outputAll.zip');
        else
            echo $output;
    }
    public function outputList(){
        $list=json_encode($_POST);
        $list=str_replace("{\"",'',$list);
        $list=str_replace("\":\"\"}",'',$list);
        $arr=explode(",",$list);
        $k=0;
        foreach ($arr as $v){
            $v=str_replace(',','',$v);
            $qu=model('Admin')->findUserById($v);
            $li[$k]=str_replace('pdfs/','',$qu['pdf']);
            $k++;
        }
        $output=model('Admin')->zipDir(Env::get('root_path').'pdfs',"outputList.zip",$li);
        if(!$output) {
            $reuslt = array(
                'status'=>'1',
                'href' => '/public/outputList.zip',
            );
            return json_encode($reuslt);
        }
        else
            return show('0','服务器错误','');
    }
    function logout(){
        Session::delete('admin');
        $this->redirect('/public/index.php/admin');
    }
}