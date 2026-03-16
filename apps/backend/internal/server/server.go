package server

import (
	"os"

	"github.com/cui/i-love-playing-ball/apps/backend/internal/config"
	"github.com/cui/i-love-playing-ball/apps/backend/internal/leaderboard"
	"github.com/cui/i-love-playing-ball/apps/backend/internal/storage"
	"github.com/gin-gonic/gin"
)

type Server struct {
	engine           *gin.Engine
	gameplayConfig   config.GameplayConfig
	leaderboardStore *leaderboard.Store
}

func New() (*Server, error) {
	gameplayConfig, err := config.LoadGameplayConfig()
	if err != nil {
		return nil, err
	}

	db, err := storage.OpenSQLite(os.Getenv("DATABASE_PATH"))
	if err != nil {
		return nil, err
	}

	leaderboardStore, err := leaderboard.NewStore(db)
	if err != nil {
		return nil, err
	}

	s := &Server{
		engine:           gin.Default(),
		gameplayConfig:   gameplayConfig,
		leaderboardStore: leaderboardStore,
	}

	s.registerRoutes()

	return s, nil
}

func (s *Server) Run(addr string) error {
	return s.engine.Run(addr)
}

func (s *Server) registerRoutes() {
	s.engine.GET("/health", s.handleHealth)
	s.engine.GET("/config/game", s.handleGameplayConfig)
	s.engine.GET("/leaderboard", s.handleLeaderboardList)
	s.engine.POST("/leaderboard/submit", s.handleLeaderboardSubmit)
}

func (s *Server) handleHealth(c *gin.Context) {
	c.JSON(200, map[string]bool{
		"ok": true,
	})
}

func (s *Server) handleGameplayConfig(c *gin.Context) {
	c.JSON(200, map[string]any{
		"data": s.gameplayConfig,
	})
}

func (s *Server) handleLeaderboardList(c *gin.Context) {
	entries, err := s.leaderboardStore.List(20)
	if err != nil {
		c.JSON(500, map[string]string{
			"error": "Failed to load leaderboard",
		})
		return
	}

	c.JSON(200, map[string]any{
		"data": entries,
	})
}

func (s *Server) handleLeaderboardSubmit(c *gin.Context) {
	var payload leaderboard.SubmitRequest
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, map[string]string{
			"error": "Invalid leaderboard payload",
		})
		return
	}

	if payload.PlayerID == "" || payload.PlayerName == "" || payload.Score < 0 {
		c.JSON(400, map[string]string{
			"error": "Invalid leaderboard payload",
		})
		return
	}

	entry, err := s.leaderboardStore.Submit(payload)
	if err != nil {
		c.JSON(500, map[string]string{
			"error": "Failed to save leaderboard entry",
		})
		return
	}

	c.JSON(201, map[string]any{
		"data": entry,
	})
}
