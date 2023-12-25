
copy /b /y .\protoCmd\*.proto combined.proto
pbjs combined.proto --es6 proto.js
pbts -o proto.d.ts proto.js