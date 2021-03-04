// https://developer.okta.com/blog/2018/10/23/build-a-single-page-app-with-go-and-vue

package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://covid-193.p.rapidapi.com/statistics"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-key", "01d2e20bdcmsh8a5d12dca861bd4p143d8ajsn0451386595eb")
	req.Header.Add("x-rapidapi-host", "covid-193.p.rapidapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}