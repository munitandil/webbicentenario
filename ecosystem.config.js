module.exports = {
    apps: [{
        name: 'PaginaBicentenarioTandil',
        exec_mode: 'cluster',
        watch: true,
        instances: 2, // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        max_memory_restart: "1G",
        args: 'start'
    }]
}