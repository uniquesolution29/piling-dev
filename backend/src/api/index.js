import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import pixels from './pixels';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default ({ config, db }) => {
	let api = Router();
	
	// mount the facets resource
	api.use('/facets', facets({ config, db }));
	
	api.get('/pixels', async (req, res) => {
		const pixels = await prisma.pixels.findMany();
		res.send(pixels);
	})

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
