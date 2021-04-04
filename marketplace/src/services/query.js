import api from './api';

async function getAsset(assetType) {
    const response = await api.post('/query/search', {
        query: {
            selector: {
                "@assetType": assetType
            }
        }
    });
    
    return response.data['result'];
}

async function getProductByCode(code) {
    const response = await api.post('/query/readAsset', {
        'key': {
            '@assetType': 'product',
            'code': code
        }
    });
    console.log(response.data);
    return response.data;
}

export { getAsset, getProductByCode }