import api from './api';

async function deleteAsset(data){
    try {
        await api.delete('/invoke/deleteAsset', {data});
        return true;
    }
    catch (error){
        return false;
    }
}

async function updateAsset(data){
    try{
        await api.put('/invoke/updateAsset', data);
        return true;
    } catch (error) {
        return false;
    }
}

async function createAsset(data){
    try {
        await api.post('/invoke/createAsset', data);
        return true;
    } catch (error) {
        return false;
    }
}

export {deleteAsset, updateAsset, createAsset}