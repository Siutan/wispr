package main

import (
    "log"
    "os"
	"strings"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/apis"
    "github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

)

func main() {
    app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())


    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
        // serves static files from the provided public dir (if exists)
        se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

        return se.Next()
    })

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
        // enable auto creation of migration files when making collection changes in the Dashboard
        // (the isGoRun check is to enable it only during development)
        Automigrate: isGoRun,
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}