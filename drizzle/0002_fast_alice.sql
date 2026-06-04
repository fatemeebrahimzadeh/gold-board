PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ads` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`mediaUrl` text NOT NULL,
	`duration` integer DEFAULT 5,
	`order` integer DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_ads`("id", "title", "mediaUrl", "duration", "order") SELECT "id", "title", "mediaUrl", "duration", "order" FROM `ads`;--> statement-breakpoint
DROP TABLE `ads`;--> statement-breakpoint
ALTER TABLE `__new_ads` RENAME TO `ads`;--> statement-breakpoint
PRAGMA foreign_keys=ON;