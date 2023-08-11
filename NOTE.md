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


## Creating Pages for printing - HTML & CSS is under the hood of most eReaaader formats - who knew :)
https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/

```
@page {
    size: A4 landscape
}
```


## MongoServerSelectionError: connection <monitor> to 15.236.172.151:27017 closed - Whitelist your ip address
By setting mongodb to allow your ip address or all ip addresses to connect to your database, you will then stop this error.

## Button href link not working - wrap them in `<a>` tags that have the href link
<a href="/sign-up">
    <button id="btn-sign-up" class="btn btn-warning form-control">Sign Up</button>
</a>


## Note about cookies:document.cookie
`document.cookie` returns all cookies (at least the ones that are visible to javascript). With cookies, Each cookie is separated by a comma `,` and each attribute is separated by a semicolon `;`

## Function.prototype.caller - deprecated - use console.trace instead
The closest thing to Function.caller is console.trace
Instead of:
```
function myFunc()
{
    console.log(myFunc.caller)
}
```
use the closest thing which is:
```
function myFunc()
{
    console.trace()//gives the full stack trace (not just the previous caller)
}
```