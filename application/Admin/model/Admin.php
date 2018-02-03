<?php
namespace app\admin\model;
use think\Model;
use think\Db;
/**
 * Created by PhpStorm.
 * User: lflx1
 * Date: 2018/2/2
 * Time: 23:53
 */
class admin extends Model
{
    public function login($data)
    {
        $db=Db::table('jszp_admin')->where('admin',$data['admin'])->find();
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
    public function fetchAdmin(){
        return Db::table('jszp_candidate')
            ->alias('a')
            ->join('jszp_user u','a.candidate_id=u.candidate_id')
            ->paginate(10);
    }
    public function fetchAdminSearch($search){
        return Db::table('jszp_candidate')
            ->alias('a')
            ->join('jszp_user u','a.candidate_id=u.candidate_id')
            ->where('a.candidate_id|candidate_name|sex|party|full_time_degree|ft_school|profession|programme_info|team','like','%'.$search.'%')
            ->paginate(10);
    }
    public function findUserById($v){
        return Db::table('jszp_user')
            ->whereLike('candidate_id',$v)
            ->find();
    }

    public function zipDir($basePath,$zipName,$fileList=NULL){
        $zip = new \ZipArchive();
        $fileArr = [];
        $fileNum = 0;
        if (is_dir($basePath)){
            if ($dh = opendir($basePath)){
                $zip->open($zipName,\ZipArchive::CREATE);
                while (($file = readdir($dh)) !== false){
                    if(in_array($file,['.','..',])) continue; //无效文件，重来
                    $file = iconv('gbk','utf-8',$file);
                    if($fileList!=NULL && !in_array($file,$fileList))continue;
                    $extension = strchr($file,'.');
                    rename(iconv('UTF-8','GBK',$basePath.'\\'.$file), iconv('UTF-8','GBK',$basePath.'\\'.$fileNum.$extension));
                    $zip->addFile($basePath.'\\'.$fileNum.$extension,$fileNum.$extension);
                    $zip->renameName($fileNum.$extension,$file);
                    $fileArr[$fileNum.$extension] = $file;
                    $fileNum++;
                }
                $zip->close();
                closedir($dh);
                foreach($fileArr as $k=>$v){
                    rename(iconv('UTF-8','GBK',$basePath.'\\'.$k), iconv('UTF-8','GBK',$basePath.'\\'.$v));
                }
            }else{
                return '服务器错误';
            }
        }else{
            return '服务器错误';
        }

    }

}