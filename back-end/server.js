require('dotenv').config();

console.log('ENV:', {
  adminName: process.env.ADMIN_NAME,
  hashLength: process.env.ADMIN_PASSWORD_HASH?.length,
  hashStart: process.env.ADMIN_PASSWORD_HASH?.slice(0, 7),
  hasJwtSecret: !!process.env.JWT_SECRET
});

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminAuth = require('./middleware/adminAuth');

const app = express();

const PORT = process.env.PORT || 3000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json({
    limit: '25mb'
}));

app.use(express.urlencoded({
    limit: '25mb',
    extended: true
}));


// =====================================================
// CAMINHO PARA OS DADOS
// =====================================================

const dataPath = path.join(
    __dirname,
    '..',
    'public',
    'data'
);

console.log(
    'PASTA DOS DADOS:',
    dataPath
);


// =====================================================
// OBTER FICHEIRO DE CADA TIPO DE PRODUTO
// =====================================================

function getFile(type) {

    const files = {
        soaps: 'soaps.json',
        candles: 'candles.json',
        arrangements: 'arranjos.json'
    };

    if (!files[type]) {
        return null;
    }

    return path.join(
        dataPath,
        files[type]
    );
}


// =====================================================
// TESTE DO SERVIDOR
// =====================================================

app.get('/', (req, res) => {

    res.send(
        'Backend da loja está a funcionar!'
    );

});


// =====================================================
// LOGIN DO ADMIN
// =====================================================


app.post('/api/admin/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      message: 'Nome e password são obrigatórios'
    });
  }

  if (name !== process.env.ADMIN_NAME) {
    return res.status(401).json({
      message: 'Nome ou password incorretos'
    });
  }

  try {
    const passwordCorrect = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: 'Nome ou password incorretos'
      });
    }

    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);

    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
});


// =====================================================
// OBTER PRODUTOS
// =====================================================

app.get('/api/:type', (req, res) => {

    const filePath = getFile(
        req.params.type
    );

    console.log(
        'FICHEIRO QUE VOU LER:',
        filePath
    );

    if (!filePath) {

        return res.status(404).json({
            message: 'Tipo de produto inválido'
        });

    }

    try {

        const data = fs.readFileSync(
            filePath,
            'utf8'
        );

        const products = JSON.parse(data);

        console.log(
            'PRODUTOS LIDOS:',
            products.length
        );

        res.json(products);

    } catch (error) {

        console.error(
            'Erro ao ler produtos:',
            error
        );

        res.status(500).json({
            message: 'Erro ao ler os dados'
        });

    }

});


// =====================================================
// GERAR ID
// =====================================================

function getNextId(products) {

    if (products.length === 0) {
        return 1;
    }

    return Math.max(
        ...products.map(
            product => Number(product.id) || 0
        )
    ) + 1;
}


// =====================================================
// CRIAR PRODUTO
// =====================================================

app.post('/api/:type', adminAuth, (req, res) => {

    const filePath = getFile(
        req.params.type
    );

    if (!filePath) {

        return res.status(404).json({
            message: 'Tipo de produto inválido'
        });

    }

    try {

        const data = fs.readFileSync(
            filePath,
            'utf8'
        );

        const products = JSON.parse(data);

        const newProduct = {
            ...req.body,
            id: getNextId(products)
        };

        products.push(newProduct);

        fs.writeFileSync(
            filePath,
            JSON.stringify(
                products,
                null,
                4
            ),
            'utf8'
        );

        console.log(
            'Produto criado:',
            newProduct.id
        );

        res.status(201).json(
            newProduct
        );

    } catch (error) {

        console.error(
            'Erro ao adicionar produto:',
            error
        );

        res.status(500).json({
            message: 'Erro ao adicionar produto'
        });

    }

});


// =====================================================
// EDITAR PRODUTO
// =====================================================

app.put('/api/:type/:id', adminAuth, (req, res) => {

    const filePath = getFile(
        req.params.type
    );

    if (!filePath) {

        return res.status(404).json({
            message: 'Tipo de produto inválido'
        });

    }

    try {

        const data = fs.readFileSync(
            filePath,
            'utf8'
        );

        const products = JSON.parse(data);

        const id = Number(
            req.params.id
        );

        const index = products.findIndex(
            product =>
                Number(product.id) === id
        );

        if (index === -1) {

            return res.status(404).json({
                message: 'Produto não encontrado'
            });

        }

        const updatedProduct = {
            ...products[index],
            ...req.body,
            id: id
        };

        products[index] = updatedProduct;

        fs.writeFileSync(
            filePath,
            JSON.stringify(
                products,
                null,
                4
            ),
            'utf8'
        );

        console.log(
            'Produto atualizado:',
            id
        );

        res.json(
            updatedProduct
        );

    } catch (error) {

        console.error(
            'Erro ao atualizar produto:',
            error
        );

        res.status(500).json({
            message: 'Erro ao atualizar produto'
        });

    }

});


// =====================================================
// ELIMINAR PRODUTO
// =====================================================

app.delete('/api/:type/:id', adminAuth, (req, res) => {

    const filePath = getFile(
        req.params.type
    );

    if (!filePath) {

        return res.status(404).json({
            message: 'Tipo de produto inválido'
        });

    }

    try {

        const data = fs.readFileSync(
            filePath,
            'utf8'
        );

        const products = JSON.parse(data);

        const id = Number(
            req.params.id
        );

        const index = products.findIndex(
            product =>
                Number(product.id) === id
        );

        if (index === -1) {

            return res.status(404).json({
                message: 'Produto não encontrado'
            });

        }

        products.splice(
            index,
            1
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(
                products,
                null,
                4
            ),
            'utf8'
        );

        console.log(
            'Produto eliminado:',
            id
        );

        res.status(204).send();

    } catch (error) {

        console.error(
            'Erro ao eliminar produto:',
            error
        );

        res.status(500).json({
            message: 'Erro ao eliminar produto'
        });

    }

});


// =====================================================
// INICIAR SERVIDOR
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            `Servidor a funcionar em http://localhost:${PORT}`
        );

    }
);