export function createIDEFriendlyPipePreprocessor(options = {}) {
	const {
		//@ts-ignore
		pipePrefix = '',
		//@ts-ignore
		pipeRegistry = null,
		//@ts-ignore
		debug = false,
		//@ts-ignore
		generateDTS = true,
		//@ts-ignore
		ideMode = process.env.NODE_ENV === 'development'
	} = options;

	return {
		markup({ content, filename }) {
			// Skip processing generated files and non-user files
			if (filename.includes('.svelte-kit/') || 
				filename.includes('node_modules/') ||
				filename.includes('generated/') ||
				filename.includes('root.svelte')) {
				return { code: content };
			}

			if (debug) {
				console.log(`Processing pipes in: ${filename}`);
			}

			// In IDE mode, transform pipes to valid JS for better IntelliSense
			if (ideMode) {
				return transformForIDE(content, filename, options);
			}

			// Normal preprocessing for build
			return transformForBuild(content, filename, options);
		}
	};
}

function transformForIDE(content, filename, options) {
	// More precise regex that only matches actual pipe syntax
	// Must have a valid expression before the pipe and a valid pipe name after
	const pipeRegex = /\{([^{}]+?)\s*\|\s*([^{}]+?)\}/g;

	const transformedContent = content.replace(pipeRegex, (match, expression, pipeChain) => {
		try {
			// Additional validation to ensure this is actually a pipe
			if (!expression.trim() || !pipeChain.trim()) {
				return match; // Skip if either part is empty
			}
			
			if (options.debug) {
				console.log(`Transforming pipe: ${match} -> expression: "${expression}", pipeChain: "${pipeChain}"`);
			}
			const transformed = transformPipeExpression(expression.trim(), pipeChain.trim(), options);
			if (options.debug) {
				console.log(`Transformed to: ${transformed}`);
			}
			// For IDE mode, just return the transformed expression without comments
			return transformed;
		} catch (error) {
			console.error(`Error transforming pipe: ${match}`, error);
			return match;
		}
	});

	return {
		code: transformedContent,
		map: null
	};
}

function transformForBuild(content, filename, options) {
	// More precise regex that only matches actual pipe syntax
	// Must have a valid expression before the pipe and a valid pipe name after
	const pipeRegex = /\{([^{}]+?)\s*\|\s*([^{}]+?)\}/g;

	const transformedContent = content.replace(pipeRegex, (match, expression, pipeChain) => {
		try {
			// Additional validation to ensure this is actually a pipe
			if (!expression.trim() || !pipeChain.trim()) {
				return match; // Skip if either part is empty
			}
			
			if (options.debug) {
				console.log(`Transforming pipe: ${match} -> expression: "${expression}", pipeChain: "${pipeChain}"`);
			}
			const transformed = transformPipeExpression(expression.trim(), pipeChain.trim(), options);
			if (options.debug) {
				console.log(`Transformed to: ${transformed}`);
			}
			return transformed;
		} catch (error) {
			console.error(`Error transforming pipe: ${match}`, error);
			return match;
		}
	});

	return {
		code: transformedContent
	};
}

function transformPipeExpression(expression, pipeChain, options) {
	const pipes = pipeChain.split('|').map(pipe => pipe.trim());
	let result = expression;

	for (const pipeExpr of pipes) {
		const colonIndex = pipeExpr.indexOf(':');
		const pipeName = colonIndex === -1 ? pipeExpr.trim() : pipeExpr.substring(0, colonIndex).trim();
		const argsString = colonIndex === -1 ? '' : pipeExpr.substring(colonIndex + 1).trim();

		const args = argsString ? parseArguments(argsString) : [];
		const fullPipeName = options.pipePrefix + pipeName;
		const allArgs = [result, ...(args || [])].join(', ');
		result = `${fullPipeName}(${allArgs})`;
	}

	return `{${result}}`;
}

function parseArguments(argsString) {
	if (!argsString.trim()) return [];

	const args = [];
	let current = '';
	let depth = 0;
	let inString = false;
	let stringChar = '';

	for (let i = 0; i < argsString.length; i++) {
		const char = argsString[i];
		const prevChar = i > 0 ? argsString[i - 1] : '';

		if (!inString && (char === '"' || char === "'")) {
			inString = true;
			stringChar = char;
			current += char;
		} else if (inString && char === stringChar && prevChar !== '\\') {
			inString = false;
			stringChar = '';
			current += char;
		} else if (!inString && (char === '(' || char === '[' || char === '{')) {
			depth++;
			current += char;
		} else if (!inString && (char === ')' || char === ']' || char === '}')) {
			depth--;
			current += char;
		} else if (!inString && char === ',' && depth === 0) {
			args.push(current.trim());
			current = '';
		} else {
			current += char;
		}
	}

	// Add the last argument if there's anything left
	if (current.trim()) {
		args.push(current.trim());
	}

	return args;
}