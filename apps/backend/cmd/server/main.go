package main

import (
	"log"
	"os"

	"github.com/cui/i-love-playing-ball/apps/backend/internal/server"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	addr := ":" + port
	srv, err := server.New()
	if err != nil {
		log.Fatalf("create server: %v", err)
	}

	log.Printf("backend listening on %s", addr)
	if err := srv.Run(addr); err != nil {
		log.Fatalf("listen server: %v", err)
	}
}
