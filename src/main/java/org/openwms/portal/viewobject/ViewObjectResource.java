/*
 * openwms.org, the Open Warehouse Management System.
 * Copyright (C) 2014 Heiko Scherrer
 *
 * This file is part of openwms.org.
 *
 * openwms.org is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * openwms.org is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this software. If not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.openwms.portal.viewobject;

import io.interface21.cloud.ui.ViewObjectVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

/**
 * A ViewObjectResource.
 *
 * @author <a href="mailto:scherrer@openwms.org">Heiko Scherrer</a>
 */
@RestController
@CrossOrigin(origins = "*", exposedHeaders = {"Location"})
class ViewObjectResource {

    private final ViewObjectService service;

    ViewObjectResource(ViewObjectService service) {
        this.service = service;
    }

    @GetMapping("/view-objects")
    ResponseEntity findAll() {
        Set<ViewObjectVO> result = service.findAll();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/view-objects")
    ResponseEntity update(@NotNull @Valid @RequestBody List<ViewObjectVO> vo) {
        service.update(vo);
        return ResponseEntity.noContent().build();
    }
}
