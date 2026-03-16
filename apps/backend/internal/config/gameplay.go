package config

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

type GameplayConfig struct {
	Game    GameRulesConfig `json:"game"`
	Scoring ScoringConfig   `json:"scoring"`
	Combo   ComboConfig     `json:"combo"`
	Emotion EmotionConfig   `json:"emotion"`
	Ads     AdsConfig       `json:"ads"`
}

type GameRulesConfig struct {
	RoundDurationSeconds  int  `json:"roundDurationSeconds"`
	ReviveDurationSeconds int  `json:"reviveDurationSeconds"`
	MaxReviveCount        int  `json:"maxReviveCount"`
	MissBreaksCombo       bool `json:"missBreaksCombo"`
}

type ScoringConfig struct {
	NormalHit        int `json:"normalHit"`
	CleanHit         int `json:"cleanHit"`
	PerfectShotBonus int `json:"perfectShotBonus"`
}

type ComboConfig struct {
	Tiers []ComboTierConfig `json:"tiers"`
}

type ComboTierConfig struct {
	Combo int    `json:"combo"`
	State string `json:"state"`
}

type EmotionConfig struct {
	DefaultState string               `json:"defaultState"`
	States       []EmotionStateConfig `json:"states"`
}

type EmotionStateConfig struct {
	Name     string `json:"name"`
	MinCombo int    `json:"minCombo"`
	Trigger  string `json:"trigger,omitempty"`
}

type AdsConfig struct {
	RewardedReviveEnabled            bool `json:"rewardedReviveEnabled"`
	InterstitialBetweenRoundsEnabled bool `json:"interstitialBetweenRoundsEnabled"`
}

func LoadGameplayConfig() (GameplayConfig, error) {
	_, currentFile, _, ok := runtime.Caller(0)
	if !ok {
		return GameplayConfig{}, fmt.Errorf("resolve current file path")
	}

	configPath := filepath.Join(
		filepath.Dir(currentFile),
		"..",
		"..",
		"..",
		"..",
		"packages",
		"game-config",
		"configs",
		"gameplay.v1.json",
	)

	payload, err := os.ReadFile(configPath)
	if err != nil {
		return GameplayConfig{}, fmt.Errorf("read gameplay config: %w", err)
	}

	var cfg GameplayConfig
	if err := json.Unmarshal(payload, &cfg); err != nil {
		return GameplayConfig{}, fmt.Errorf("decode gameplay config: %w", err)
	}

	return cfg, nil
}
