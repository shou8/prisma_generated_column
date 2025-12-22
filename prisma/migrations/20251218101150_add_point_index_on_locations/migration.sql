-- CreateIndex
CREATE INDEX "locations_point_idx" ON "locations" USING GIST ("point");