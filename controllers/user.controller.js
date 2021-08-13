const { request, response } =require('express')

const userGet = (req, res = response) => {
    res.json({msg: 'Get Api- Controller!'})
}

const userPost = (req = request, res = response) => {
    const body = req.body;
    res.json({
        msg: 'post Api!',
        body
    })
}

const userPut =( req = request, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put Api!',
        id
    })
}

const userDelete = (req, res = response) => {
    res.json({msg: 'Delete Api!'})
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
