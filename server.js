const ronin = require('ronin-server')
const database = require('ronin-database')
const mocks = require('ronin-mocks')
const { Client } = require("@elastic/elasticsearch");
const axios = require('axios');

async function main() {
    console.log("llslll")
    const elasticsearchUrl = 'http://elasticsearch:9200'
    var client = new Client({
        node: 'http://elasticsearch:9200'
    });
    axios.get(elasticsearchUrl)
        .then((response) => {
            console.log('Elasticsearch is running');
            console.log(response.data);
        })
        .catch((error) => {
            console.log('Elasticsearch is not running');
            console.error(error);
        });

    client.index({
        index: 'student',
        id: 12,
        body: {
            name: 'John Doe',
            age: 17,
            hobby: 'basketball'
        }
    })
    console.log("resultES1")


    console.log("resultES2")
    try {
        await database.connect(process.env.CONNECTIONSTRING)

        const server = ronin.server({
            port: process.env.SERVER_PORT
        })

        server.use('/', mocks.server(server.Router()))

        const result = await server.start()
        console.info(result)

    } catch (error) {
        console.error(error)
    }
}

main()