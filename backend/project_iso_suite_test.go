package project_iso_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestProjectIso(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "ProjectIso Suite")
}
