
const merge = require('webpack-merge');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const postcssCustomProperties = require('postcss-custom-properties');

const cssLoader = {
        test: /\.css$/,
        use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
                    ident: 'postcss',
                    plugins: () => [
                        postcssCustomProperties(/* pluginOptions */)
                    ]
                } }
        ]
    }

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    // If you want to add a new alias to the config.
    config.resolve.alias['react-native'] = 'react-native-web';
    config.resolve.alias['react-native-maps'] = 'react-native-web-maps';

    // Maybe you want to turn off compression in dev mode.
    if (config.mode === 'development') {
        config.devServer.compress = false;
    }

    // Or prevent minimizing the bundle when you build.
    if (config.mode === 'production') {
        config.optimization.minimize = false;
    }

    // Remove existing rules about SVG and inject our own
    // (Inspired by https://github.com/storybookjs/storybook/issues/6758#issuecomment-495598635)
    config.module.rules = config.module.rules.map(rule => {
        if (rule.oneOf) {
            let hasModified = false;

            const newRule = {
                ...rule,
                oneOf: rule.oneOf.map(oneOfRule => {
                    if (oneOfRule.test && oneOfRule.test.toString().includes('svg')) {
                        hasModified = true;
                        const test = oneOfRule.test.toString().replace('|svg', '');
                        return { ...oneOfRule, test: new RegExp(test) };
                    } else {
                        return oneOfRule;
                    }
                })
            };

            // Add new rule to use svgr
            // Place at the beginning so that the default loader doesn't catch it
            if (hasModified) {
                newRule.oneOf.unshift({
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                        }
                    ]
                });
            }

            return newRule;
        } else {
            return rule;
        }
    });

    // Finally return the new config for the CLI to use.
    return config;
};
