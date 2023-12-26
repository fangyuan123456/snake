@echo off

call copy /b /y .\protoCmd\*.proto combined.proto
call pbjs combined.proto --ts proto.ts
call copy /y proto.ts ..\server\src\common\proto\proto.ts
call copy /y proto.ts ..\assets\Script\common\proto\proto.ts

pause