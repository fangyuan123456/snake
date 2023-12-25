
copy /b /y .\protoCmd\*.proto combined.proto
pbjs combined.proto --ts proto.ts