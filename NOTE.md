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


## Checking if the db is connected - client.connect() (stackoverflow post)[https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected]
At the link Dem specified (GitHub link)[https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md#removed-deprecations] it says that calling `connect` is a 'no-op' ('no operation' I believe) if you are already connected. So I think you can just call connect instead in most cases.

## JavaScript and 16bit strings - see [article](https://levelup.gitconnected.com/what-exactly-are-javascript-strings-sequences-of-8-bit-units-or-16-bit-units-b731b74c78c0)
JavaScript uses 16bit string not 8bit. Means more room for things like emojis etc.
Long story short - it uses something called surrogates to link some character that have two parts like emojis with one character (the low surrogate) pointing to the other character (the high surrogate).

JavaScript lists this 'one' (high and low surrogate character) as two 16 bit places. The `str.length` method does not actually look at string length, but at string character units (how many 16 bit units there are). This means that as emojis are listed as two 16 bit places, the `str.length` method  will give you "incorrect" results if you are expecting it to count one character per emoji when it is actually giving a result of 2 chracters per emoji.

Solution: use `[...str].length` instead.
By using the spread operator with the string inside of an array, this syntax gets the length of the array of characters within the string.

You can also use the `for...of` loop ([see link](https://www.programiz.com/javascript/for-of#:~:text=for...of%20Vs%20for...in&text=The%20for...in%20loop,loop%20was%20introduced%20in%20ES6.)) in order to loop through the chracters instead of the 16bit units of the string. Note FOR...OF id don't know if its the same for `for..in` loop

```
var str = 'Hello 🙂'

for (var char of str)
{
    console.log(char)
}
```