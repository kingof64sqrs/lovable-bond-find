#!/bin/bash

# Admin Panel Integration Validation Script

echo "🔍 Validating Admin Panel Integration..."
echo ""

# Check if servers are running
echo "1️⃣  Checking if servers are running..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Backend server is running on http://localhost:3000"
else
    echo "❌ Backend server is NOT running!"
    echo "   Start with: cd backend && npm run dev"
fi

if curl -s http://localhost:5003 > /dev/null; then
    echo "✅ Frontend server is running on http://localhost:5003"
else
    echo "❌ Frontend server is NOT running!"
    echo "   Start with: npm run dev"
fi

echo ""
echo "2️⃣  Checking file structure..."

# Count admin pages
ADMIN_PAGES=$(find src/pages/admin -name "*.tsx" | wc -l)
echo "📄 Found $ADMIN_PAGES admin page files"

# Check for AdminLayout usage
ADMINLAYOUT_COUNT=$(grep -r "import AdminLayout" src/pages/admin/ | wc -l)
echo "📄 $ADMINLAYOUT_COUNT pages use AdminLayout component"

# Check for old SidebarProvider usage
SIDEBARPROVIDER_COUNT=$(grep -r "SidebarProvider" src/pages/admin/ | wc -l)
if [ $SIDEBARPROVIDER_COUNT -eq 0 ]; then
    echo "✅ No files using old SidebarProvider pattern"
else
    echo "⚠️  $SIDEBARPROVIDER_COUNT files still use SidebarProvider"
    grep -r "SidebarProvider" src/pages/admin/ | cut -d: -f1 | sort -u
fi

echo ""
echo "3️⃣  Checking API integration..."

# Check if API service exists
if [ -f "src/lib/api.ts" ]; then
    echo "✅ API service file exists (src/lib/api.ts)"
    
    # Count API endpoints
    ENDPOINTS=$(grep -c "apiGet\|apiPost\|apiPut\|apiDelete" src/lib/api.ts)
    echo "📡 $ENDPOINTS API endpoint methods defined"
else
    echo "❌ API service file not found!"
fi

echo ""
echo "4️⃣  Checking backend routes..."

# Check backend route files
if [ -f "backend/src/routes/adminRoutes.ts" ]; then
    echo "✅ Admin routes file exists"
    ADMIN_ROUTES=$(grep -c "router\." backend/src/routes/adminRoutes.ts)
    echo "   📡 ~$ADMIN_ROUTES admin endpoints defined"
fi

if [ -f "backend/src/routes/referenceDataRoutes.ts" ]; then
    echo "✅ Reference data routes file exists"
    REF_ROUTES=$(grep -c "router\." backend/src/routes/referenceDataRoutes.ts)
    echo "   📡 ~$REF_ROUTES reference data endpoints defined"
fi

if [ -f "backend/src/routes/userActivityRoutes.ts" ]; then
    echo "✅ User activity routes file exists"
fi

echo ""
echo "5️⃣  Checking components..."

if [ -f "src/components/AdminLayout.tsx" ]; then
    echo "✅ AdminLayout component exists"
fi

if [ -f "src/components/AdminSidebar.tsx" ]; then
    echo "✅ AdminSidebar component exists"
fi

echo ""
echo "6️⃣  Testing backend API endpoints..."

TOKEN=$(cat <<EOF
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRH7gNb9pXDn0B1pXDn0B1pXDn0B1pXDn0B1pX
EOF
)

# Test health endpoint
echo -n "Testing /api/health... "
if curl -s http://localhost:3000/api/health | grep -q "success"; then
    echo "✅"
else
    echo "❌"
fi

# Test reference data endpoints (no auth required for GET in development)
echo -n "Testing /api/reference/religions... "
RELIGIONS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/reference/religions)
if echo "$RELIGIONS_RESPONSE" | grep -q "success"; then
    echo "✅"
else
    echo "⚠️  (May need authentication)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Validation Complete!"
echo ""
echo "📊 Summary:"
echo "   • Total admin pages: $ADMIN_PAGES"
echo "   • Using AdminLayout: $ADMINLAYOUT_COUNT"
echo "   • Using old pattern: $SIDEBARPROVIDER_COUNT"
echo ""
echo "🚀 Next Steps:"
echo "   1. Access admin panel: http://localhost:5003/admin"
echo "   2. Test CRUD operations on various pages"
echo "   3. Verify all API endpoints work correctly"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
