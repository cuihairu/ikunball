package leaderboard

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Entry struct {
	ID         uint      `gorm:"primaryKey" json:"-"`
	PlayerID   string    `gorm:"index;not null" json:"playerId"`
	PlayerName string    `gorm:"not null" json:"playerName"`
	Score      int       `gorm:"not null" json:"score"`
	CreatedAt  time.Time `gorm:"not null" json:"createdAt"`
}

type SubmitRequest struct {
	PlayerID   string `json:"playerId"`
	PlayerName string `json:"playerName"`
	Score      int    `json:"score"`
}

type Store struct {
	db *gorm.DB
}

func NewStore(db *gorm.DB) (*Store, error) {
	if err := db.AutoMigrate(&Entry{}); err != nil {
		return nil, err
	}

	store := &Store{db: db}
	if err := store.seed(); err != nil {
		return nil, err
	}

	return store, nil
}

func (s *Store) List(limit int) ([]Entry, error) {
	var entries []Entry

	query := s.db.Order("score DESC").Order("created_at ASC")
	if limit > 0 {
		query = query.Limit(limit)
	}

	if err := query.Find(&entries).Error; err != nil {
		return nil, err
	}

	return entries, nil
}

func (s *Store) Submit(payload SubmitRequest) (Entry, error) {
	entry := Entry{
		PlayerID:   payload.PlayerID,
		PlayerName: payload.PlayerName,
		Score:      payload.Score,
		CreatedAt:  time.Now().UTC(),
	}

	if err := s.db.Create(&entry).Error; err != nil {
		return Entry{}, err
	}

	return entry, nil
}

func (s *Store) seed() error {
	var count int64
	if err := s.db.Model(&Entry{}).Count(&count).Error; err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	now := time.Now().UTC()
	entries := []Entry{
		{PlayerID: "demo-1", PlayerName: "鸡你太投", Score: 28, CreatedAt: now},
		{PlayerID: "demo-2", PlayerName: "空心小鸡", Score: 22, CreatedAt: now.Add(time.Second)},
	}

	return s.db.Create(&entries).Error
}

func IsNotFound(err error) bool {
	return errors.Is(err, gorm.ErrRecordNotFound)
}
