package storage

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func OpenSQLite(path string) (*gorm.DB, error) {
	databasePath, err := resolveDatabasePath(path)
	if err != nil {
		return nil, err
	}

	if err := os.MkdirAll(filepath.Dir(databasePath), 0o755); err != nil {
		return nil, fmt.Errorf("create database directory: %w", err)
	}

	db, err := gorm.Open(sqlite.Open(databasePath), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("open sqlite database: %w", err)
	}

	return db, nil
}

func resolveDatabasePath(path string) (string, error) {
	if path != "" {
		return path, nil
	}

	_, currentFile, _, ok := runtime.Caller(0)
	if !ok {
		return "", fmt.Errorf("resolve current file path")
	}

	return filepath.Join(
		filepath.Dir(currentFile),
		"..",
		"..",
		"data",
		"app.db",
	), nil
}
