chcp 65001
set /p userInput=请输入版本号:
call node index.js -v "%userInput%"
call xcopy /s /e /i /y ..\output\server ..\..\..\server\src\common\config\tables
call xcopy /s /e /i /y ..\output\server ..\..\..\server\dist\common\config\tables
call xcopy /s /e /i /y ..\output\client ..\..\..\client\assets\resources\tableCfg
@pause