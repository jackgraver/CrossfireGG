package utils

import (
	"cf-apiserver/config"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
)

// var FACEIT_API_KEY = os.Getenv("FACEIT_API_KEY")
var FACEIT_API_KEY = config.FaceitAPI

// func init() {
// 	if FACEIT_API_KEY == "" {
// 		panic("FACEIT_API_KEY not set")
// 	}
// }

func FetchFromAPI(url string, writeToFile string) (map[string]any, error) {
	if url == "" {
		return map[string]any{}, nil
	}

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer " + FACEIT_API_KEY)
	req.Header.Add("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, errors.New(resp.Status)
	}

	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	if writeToFile != "" {
		filePath := filepath.Join(".test_data", writeToFile)
		data, _ := json.MarshalIndent(result, "", "    ")
		if err := os.WriteFile(filePath, data, 0644); err != nil {
			return nil, err
		}
	}

	return result, nil
}

func ReadFromFile(fileName string) (map[string]any, error) {
	if fileName == "" {
		return map[string]any{}, nil
	}

	filePath := filepath.Join(".test_data", fileName)
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var result map[string]any
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	return result, nil
}

func ExtractIDFromLink(link string) *string {
    re := regexp.MustCompile(`(?i)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`)
    match := re.FindString(link)
    if match == "" {
        return nil
    }
    return &match
}