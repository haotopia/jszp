<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // 生成应用公共文件
    '__file__' => ['common.php'],

    'Candidate'     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index'],
        'model'      => ['Pdf', 'DataOperate'],
        'view'       => ['index/index'],
    ],


    'User'		     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index','Reset'],
        'model'      => ['User', 'Reset'],
        'view'       => ['index/index'],
    ],
    // 其他更多的模块定义
];
