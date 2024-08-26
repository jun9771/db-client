// var express = require('express');
// var router = express.Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({extended: true})); 
// router.use(bodyParser.json()); //클라이언트에서 json타입으로 요청하니까 json으로 파싱

// var dbconnect_module = require('./dbconnect_module');

// router.post('/', (req, res, next) => {  /*타입값을 가져오는 것 (ex. select,delete..) */
//    let type = req.query.type;
//    if(type == 'list'){
//     // 전체 목록 조회
//     try {
//         req.body.mapper = 'swToolsMapper';
//         req.body.crud = 'select';
//         req.body.mapper_id = 'selectSwToolsList';
//         next();

//     }catch(error){
//         console.log('Module > dbconnect error');
//     }

//    }
// },dbconnect_module); // dbconnect_module 이 next 원래는 response로 클라이언트에 보내야하는데 중간에 next()호출해서 dbconnect_module로 보내게됨.

// module.exports = router;

var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

var dbconnect_module = require('./dbconnect_module');
const { convertSet } = require('mybatis-mapper/lib/convert');

router.post('/', (req, res, next) => {
    let type = req.query.type;
    if(type == 'list') {
        // 전체 목록 조회
        try {
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'select';
            req.body.mapper_id = 'selectSwToolList';
            next();
        }catch (error) {
            console.log('Module > select dbconnect error : ' + error);
        }
    }
    else if(type == 'save'){
        //등록
        try{
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'insert';
            req.body.mapper_id = 'insertSwToolsInfo';
            next();
        }catch (error){
            console.log('Module > insert dbconnect error : ' + error);
        }
    }
    else if(type == 'modify') {
        // 수정
        try {
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'update';
            req.body.mapper_id = 'updateSwToolsInfo';
            next();
        }catch(error) {
            console.log('Module > update dbconnect error : ' + error);
        }
    }
    else if (type == 'delete'){
        //삭제
        try {
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'delete';
            req.body.mapper_id = 'deleteSwToolsInfo';
            next();
        }catch(error) {
            console.log('Module > delete dbconnect error : ' + error);
        }
    }
}, dbconnect_module);

module.exports = router;