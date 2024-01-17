call pbjs -t json proto/center.proto >json/center.json
call xcopy /s /e /i /y proto ..\..\server\src\common\proto
call xcopy /s /e /i /y json ..\..\client\assets\resources\proto
pause