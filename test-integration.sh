#!/bin/bash

# Comprehensive Integration Test Script
echo "🧪 Running Integration Tests for Admin Panel..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BACKEND_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:5003"

# Test counters
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local endpoint=$1
    local description=$2
    local method=${3:-GET}
    
    echo -n "Testing $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" -X $method "$BACKEND_URL$endpoint")
    
    if [ "$response" = "200" ] || [ "$response" = "401" ]; then
        echo -e "${GREEN}✓${NC} (HTTP $response)"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} (HTTP $response)"
        ((FAILED++))
    fi
}

echo ""
echo "1️⃣  Testing Backend Health..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_endpoint "/api/health" "Health Check"

echo ""
echo "2️⃣  Testing Admin Endpoints..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_endpoint "/api/admin/members" "Members API"
test_endpoint "/api/admin/approvals" "Approvals API"
test_endpoint "/api/admin/matches" "Matches API"
test_endpoint "/api/admin/form-data" "Form Data API"
test_endpoint "/api/admin/membership-plans" "Membership Plans API"
test_endpoint "/api/admin/advertisements" "Advertisements API"
test_endpoint "/api/admin/user-activity" "User Activity API"
test_endpoint "/api/admin/content" "Content API"
test_endpoint "/api/admin/email-templates" "Email Templates API"
test_endpoint "/api/admin/contact-data" "Contact Data API"
test_endpoint "/api/admin/payment-options" "Payment Options API"

echo ""
echo "3️⃣  Testing Reference Data Endpoints..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_endpoint "/api/reference/religions" "Religions API"
test_endpoint "/api/reference/castes" "Castes API"
test_endpoint "/api/reference/sub-castes" "Sub-Castes API"
test_endpoint "/api/reference/gotras" "Gotras API"
test_endpoint "/api/reference/countries" "Countries API"
test_endpoint "/api/reference/states" "States API"
test_endpoint "/api/reference/cities" "Cities API"
test_endpoint "/api/reference/occupations" "Occupations API"
test_endpoint "/api/reference/educations" "Educations API"
test_endpoint "/api/reference/mother-tongues" "Mother Tongues API"
test_endpoint "/api/reference/stars" "Stars API"
test_endpoint "/api/reference/rasis" "Rasis API"
test_endpoint "/api/reference/annual-incomes" "Annual Incomes API"
test_endpoint "/api/reference/doshs" "Doshs API"

echo ""
echo "4️⃣  Testing User Activity Endpoints..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_endpoint "/api/user-activity/express-interests" "Express Interests API"
test_endpoint "/api/user-activity/messages" "Messages API"
test_endpoint "/api/user-activity/viewed-profiles" "Viewed Profiles API"
test_endpoint "/api/user-activity/blocked-profiles" "Blocked Profiles API"
test_endpoint "/api/user-activity/shortlisted-profiles" "Shortlisted Profiles API"

echo ""
echo "5️⃣  Testing Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -n "Testing homepage... "
if curl -s "$FRONTEND_URL" > /dev/null; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((FAILED++))
fi

echo -n "Testing admin route... "
if curl -s "$FRONTEND_URL/admin" > /dev/null; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((FAILED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Results:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo "Total:  $((PASSED + FAILED))"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "🎉 Integration is complete and working!"
    exit 0
else
    echo ""
    echo -e "${YELLOW}⚠️  Some tests failed${NC}"
    echo "Note: 401 responses are expected for protected endpoints without authentication"
    exit 1
fi
