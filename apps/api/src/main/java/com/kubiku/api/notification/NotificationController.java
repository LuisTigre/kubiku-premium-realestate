package com.kubiku.api.notification;

import com.kubiku.api.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "User alert management")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    @GetMapping
    public List<Notification> getMyNotifications() {
        return notificationService.getMyNotifications(userService.syncUserWithAuth().getId());
    }

    @GetMapping("/unread/count")
    public long getUnreadCount() {
        return notificationService.getUnreadCount(userService.syncUserWithAuth().getId());
    }

    @PatchMapping("/{id}/read")
    public void markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
    }
}
