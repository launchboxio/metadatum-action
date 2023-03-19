const axios = require('axios');
const core = require('@actions/core');

async function run() {
  try {
    // Fetch an OIDC token for authenticating to Metadatum
    const audience = core.getInput('audience', {required: false});
    const token = core.getIDToken(audience)

    const instance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: core.getInput('endpoint')
    })

    // Based on requested action, build a request
    switch (core.getInput('action')) {
      case 'set':
        await instance.post("/api/v1/metadata", core.getInput('data'))
        break
      case 'get':
        await instance.get("/api/v1/metadata", {
          params: generateParameters(core.getInput('query'))
        })
        break
      case 'delete':
        throw new Error("Delete method not currently supported")
      case 'update':
        throw new Error("Update method not currently supported")
      default:
        throw new Error(`Invalid method ${core.getInput('action')} provided`)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

const generateParameters = (input) => {
  let params = JSON.parse(input)
  return new URLSearchParams(params);
}

if (require.main === module) {
  run();
}