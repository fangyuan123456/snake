call pbjs -t json proto/center.proto >json/center.json
call pbjs -t json proto/info.proto >json/info.json
call pbjs -t json proto/game.proto >json/game.json
call pbjs -t json proto/match.proto >json/match.json
call xcopy /s /e /i /y json ..\..\server\src\common\proto
call xcopy /s /e /i /y json ..\..\server\dist\common\proto
call xcopy /s /e /i /y json ..\..\client\assets\resources\proto
pause