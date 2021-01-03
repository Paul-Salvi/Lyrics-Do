
async function getAsync(endpoint) {
    let response = await fetch(endpoint);
    let data = await response.json();
    console.log(data);
    return data;
  }
export {   
    getAsync,
};
