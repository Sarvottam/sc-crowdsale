# sc-crowdsale
Postman Link
Transfer Token
curl --location --request POST 'http://localhost:7777/api/sc/transferToken' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'receipientAddress=0x0901D09f378a17fcaE99dB042c24796A051145e2' \
--data-urlencode 'privateKey=ddec75668e02626a9b386f1e7ae943754bf08b9d16648a3ad990d3aa47dfeb69' \
--data-urlencode 'token=10'

Purchase Token
curl --location --request POST 'http://localhost:7777/api/sc/purchaseToken' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'amount=0.1' \
--data-urlencode 'receipientAddress=0x0901D09f378a17fcaE99dB042c24796A051145e2' \
--data-urlencode 'privateKey=ddec75668e02626a9b386f1e7ae943754bf08b9d16648a3ad990d3aa47dfeb6'


Get Decimal

curl --location --request GET 'http://localhost:7777/api/sc/tokenDecimal'
