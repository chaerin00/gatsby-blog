---
title: How to use gRPC with Protobuf
date: 2024-08-21 17:08:17
category: gRPC
thumbnail: { thumbnailSrc }
draft: false
---

## Protobuf

Protocol Buffers are language-neutral, platform-neutral extensible mechanisms for serializing structured data. Protocol buffers support generated code in C++, C#, Dart, Go, Java, Kotlin, Objective-C, Python, and Ruby. In this post, python code will be used for examples.

For gRPC server, Request/Response messages are defined in `.proto` file. For details of Protobuf, check [this document](https://protobuf.dev)

### Example

network/network_service.proto

```proto3
syntax = "proto3";

package system.v0;

service NetworkService {
 rpc ConnectWifi(ConnectWifiRequest) returns (ConnectWifiResponse) {}
}


message ConnectWifiRequest {
 string ssid = 1;
 optional string password = 2;
}


message ConnectWifiResponse {
 // Empty message
}
```

In this example, the `NetworkService` includes a method called `ConnectWifi`. `ConnectWifiRequest` has two fields: `ssid` and an optional `password`. The `ConnectWifiResponse` is an empty message. Similar to HTTP status codes (such as 200, 400, 401, 404, 500), gRPC also uses status codes. Instead of creating a success field to indicate whether the request was successful, it's recommended to use gRPC status codes.

> - INVALID_ARGUMENT
> - NOT_FOUND
> - ALREADY_EXISTS
> - FAILED_PRECONDITION
> - ABORTED
> - OUT_OF_RANGE
> - DATA_LOSS

## BUILD

After defining the messages in the `.proto` file, the next step is to generate the corresponding Python code. To generate the files directly, you can use the following command. For more detailed instructions, refer to [this document](https://protobuf.dev/reference/python/python-generated/).

```bash
python -m grpc_tools.protoc -I. --python_out=. --pyi_out=. --grpc_python_out=. ./network_service.proto
```

After running this command, you should see the `_pb2.py` and `_pb2_grpc.py` files generated.

When using Bazel, these files can be generated behind the scenes and imported into Python codes. This approach is advantageous because it eliminates the need to manually include auto-generated code changes every time the proto files are updated.

### Example

network/BUILD

```BUILD
load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_library")

py_proto_library(
  name = "network_proto_lib",
  protos = ["message.proto"],
  with_grpc = True,
)

py_library(
    name = "network_service",
    srcs = ["network_service.py"],
    deps = [
        // dependencies
        ":network_proto_lib",
        packages("grpcio"),
    ],
)

```

## \_service.py

The \_service.py file(network_service.py in this example) contains the actual implementations based on the protobuf messages.

The `_pb2_grpc.py` file contains an auto-generated `<ServiceName>Servicer` class based on the `.proto` file. The `_service.py` file will contain the actual implementations using the `Servicer` class.

### Example

network/network_service.py

```py
from network import network_pb2_grpc
from network import network_pb2

class NetworkService(network_pb2_grpc.NetworkServiceServicer):
   def ConnectWifi(self, request, context):
      # connect wifi
      if not is_valid_field(request.ssid, request.password):
        context.abort(grpc.StatusCode.INVALID_ARGUMENT, 'Invalid fields')

      return network_pb2.ConnectWifiResponse()

```

## gRPC server

```py
def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  network_pb2_grpc.add_NetworkServiceServicer_to_server(NetworkServiceServicer(), server)
  server.add_insecure_port("[::]:50051")
  server.start()
  server.wait_for_termination()
```

You can also add multiple services to the server.

```py
def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  first_service_pb2_grpc.add_FirstServiceServicer_to_server(FirstServiceServicer(), server)
  second_service_pb2_grpc.add_SecondServiceServicer_to_server(SecondServiceServicer(), server)
  server.add_insecure_port("[::]:50051")
  server.start()
  server.wait_for_termination()
```

## gRPC client

```py
def run():
  channel = grpc.insecure_channel('[::]:50051')
  stub = network_service_pb2_grpc.NetworkServiceStub(channel)
  stub.ConnectWifi(ssid='wifi_name', password='1234')
```
