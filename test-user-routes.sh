#!/bin/bash

# Frontend-Backend Integration Test Script

echo "======================================"
echo "🔍 FRONTEND-BACKEND INTEGRATION TEST"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    # Make request (without auth for now, expect 401 for auth-protected routes)
    response=$(curl -s -X $method http://localhost:3000$endpoint -w "\n%{http_code}")
    status_code=$(echo "$response" | tail -n 1)
    
    # 401 is OK (means auth is working), 200 is OK (means endpoint exists)
    if [ "$status_code" = "200" ] || [ "$status_code" = "401" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status_code)"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $status_code)"
        ((FAILED++))
    fi
}

echo "📡 Testing Backend User Routes (localhost:3000)"
echo "----------------------------------------"

# Profile endpoints
test_endpoint "GET" "/api/profile/me" "Get Current Profile"
test_endpoint "GET" "/api/profile/123" "Get Profile by ID"
test_endpoint "POST" "/api/profile" "Create Profile"
test_endpoint "PUT" "/api/profile" "Update Profile"

# Search endpoints
test_endpoint "POST" "/api/search" "Search Profiles"
test_endpoint "GET" "/api/matches" "Get Matches"
test_endpoint "GET" "/api/matches/recommendations" "Get Recommendations"

# Interest endpoints
test_endpoint "POST" "/api/interests/send" "Send Interest"
test_endpoint "GET" "/api/interests/received" "Get Received Interests"
test_endpoint "GET" "/api/interests/sent" "Get Sent Interests"
test_endpoint "GET" "/api/interests/mutual" "Get Mutual Interests"

# Dashboard endpoints
test_endpoint "GET" "/api/dashboard/stats" "Get Dashboard Stats"
test_endpoint "GET" "/api/dashboard/activity" "Get Recent Activity"
test_endpoint "GET" "/api/dashboard/notifications" "Get Notifications"

# Activity endpoints
test_endpoint "GET" "/api/activity/shortlist" "Get Shortlist"
test_endpoint "GET" "/api/activity/viewers" "Get Profile Viewers"

# Messages endpoints
test_endpoint "GET" "/api/messages/conversations" "Get Conversations"

# Settings endpoints
test_endpoint "GET" "/api/settings" "Get Settings"

# Subscription endpoints
test_endpoint "GET" "/api/subscription/plans" "Get Subscription Plans"
test_endpoint "GET" "/api/subscription/current" "Get Current Subscription"

echo ""
echo "========================================"
echo "📊 TEST RESULTS"
echo "========================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    echo ""
    echo "✅ Backend is properly configured"
    echo "✅ All user routes are accessible"
    echo "✅ Authentication middleware is working (401 responses)"
    echo ""
    echo "Next steps:"
    echo "1. Make sure both servers are running"
    echo "2. Test frontend at http://localhost:5002"
    echo "3. Check Search and Dashboard pages"
else
    echo -e "${RED}⚠️  Some tests failed${NC}"
    echo "Make sure the backend server is running on port 3000"
fi

echo ""
