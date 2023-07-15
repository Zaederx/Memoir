# Notes for futures projects

## Generating Certificates for projects
If you want to generate certificates for sites, you can either use java keygen tool and then use jks-js tool to convert the java keystore file a java object containing both the extracted key and certificate you need.

OR

You can use the openssl tool to generate keys and certificates:
```openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.crt```
see https://github.com/openssl/openssl/blob/master/INSTALL.md#building-openssl
on how to install / build openssl

Here's the mongo db manual:
https://www.mongodb.com/docs/manual/reference/operator/query/

Here's how to do pagination with MongoDB
https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#using-skip--