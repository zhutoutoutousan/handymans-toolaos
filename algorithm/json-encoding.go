package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

/*
 * Complete the 'EncodeManager' function below and the struct Manager.
 *
 * The function is expected to return an io.Reader and an error.
 * The function accepts *Manager manager as parameter.
 */

type Manager struct {
	FullName       string
	Position       string
	Age            int32
	YearsInCompany int32
}

func newManager(fullName string, position string, age int32, yearsInCompany int32) *Manager {
	return &Manager{
		FullName:       fullName,
		Position:       position,
		Age:            age,
		YearsInCompany: yearsInCompany,
	}
}

func EncodeManager(manager *Manager) (io.Reader, error) {
	// read manager data from io.Reader, convert it to JSON string format, and return the JSON, use underscore delimiter
	// e.g. {"full_name":"John Smith","position":"CEO","age":50,"years_in_company":5}
	full_name := manager.FullName
	position := manager.Position
	years_in_company := manager.YearsInCompany
	age := manager.Age
	// Convert to JSON, use bytes and encoding/json
	// Use underscore delimiter
	// e.g. {"full_name":"John Smith","position":"CEO","age":50,"years_in_company":5}
	// Edge cases, if full_name is empty, position is empty, age is 0, years_in_company is 0, don't include them in json_string
	// e.g. {"position":"CEO","age":50,"years_in_company":5}
	json_string := "{\"full_name\":\"" + full_name + "\",\"position\":\"" + position + "\",\"age\":" + strconv.Itoa(int(age)) + ",\"years_in_company\":" + strconv.Itoa(int(years_in_company)) + "}"
	// Remove empty fields from json_string for full_name, position, age, years_in_company
	if full_name == "" {
		json_string = strings.Replace(json_string, "\"full_name\":\"\"", "", -1)
	}
	if position == "" {
		json_string = strings.Replace(json_string, "\"position\":\"\"", "", -1)
	}
	if age == 0 {
		json_string = strings.Replace(json_string, ",\"age\":0,", "", -1)
	}
	if years_in_company == 0 {
		json_string = strings.Replace(json_string, "\"years_in_company\":0", "", -1)
	}
	return bytes.NewReader([]byte(json_string)), nil
}

func main() {
	reader := bufio.NewReaderSize(os.Stdin, 16*1024*1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 16*1024*1024)

	manager := &Manager{}

	fullName := readLine(reader)
	if fullName != "" {
		manager.FullName = fullName
	}

	position := readLine(reader)
	if position != "" {
		manager.Position = position
	}

	ageTemp, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
	checkError(err)
	age := int32(ageTemp)
	if age != 0 {
		manager.Age = age
	}

	yearsInCompanyTemp, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
	checkError(err)
	yearsInCompany := int32(yearsInCompanyTemp)
	if yearsInCompany != 0 {
		manager.YearsInCompany = yearsInCompany
	}

	resultReader, err := EncodeManager(manager)
	checkError(err)

	result, err := ioutil.ReadAll(resultReader)
	checkError(err)

	fmt.Fprintf(writer, "%s\n", string(result))

	writer.Flush()
}

func readLine(reader *bufio.Reader) string {
	str, _, err := reader.ReadLine()
	if err == io.EOF {
		return ""
	}

	return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
